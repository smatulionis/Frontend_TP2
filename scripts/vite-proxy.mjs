import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { build, createServer, preview } from "vite";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const command = process.argv[2] ?? "dev";

function run(commandName, args, options = {}) {
  return spawnSync(commandName, args, {
    stdio: "pipe",
    encoding: "utf8",
    ...options,
  });
}

function findAvailableDrive() {
  const candidates = ["Z", "Y", "X", "W", "V", "U", "T", "S", "R"];

  for (const letter of candidates) {
    if (!fs.existsSync(`${letter}:\\`)) {
      return `${letter}:`;
    }
  }

  throw new Error("No se encontro una letra de unidad disponible para iniciar Vite.");
}

function createSubstDrive() {
  if (process.platform !== "win32") {
    return null;
  }

  const drive = findAvailableDrive();
  const result = run("subst", [drive, projectRoot]);

  if (result.status !== 0) {
    throw new Error(result.stderr?.trim() || "No se pudo crear la unidad temporal para Vite.");
  }

  return drive;
}

function removeSubstDrive(drive) {
  if (!drive) {
    return;
  }

  run("subst", [drive, "/D"]);
}

function createViteConfig(root) {
  return {
    configFile: false,
    root,
    plugins: [react()],
    resolve: {
      preserveSymlinks: true,
    },
    optimizeDeps: {
      esbuildOptions: {
        preserveSymlinks: true,
      },
    },
  };
}

let mountedDrive = null;

async function closeResources(server) {
  if (server) {
    await server.close();
  }

  removeSubstDrive(mountedDrive);
}

try {
  mountedDrive = createSubstDrive();
  const workingRoot = mountedDrive ? `${mountedDrive}\\` : projectRoot;
  const viteConfig = createViteConfig(workingRoot);

  if (command === "build") {
    await build(viteConfig);
    removeSubstDrive(mountedDrive);
    process.exit(0);
  }

  if (command === "preview") {
    const previewServer = await preview(viteConfig);
    previewServer.printUrls();

    const shutdown = async () => {
      await closeResources(previewServer);
      process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
    process.stdin.resume();
  } else {
    const devServer = await createServer(viteConfig);
    await devServer.listen();
    devServer.printUrls();

    const shutdown = async () => {
      await closeResources(devServer);
      process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
    process.stdin.resume();
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  removeSubstDrive(mountedDrive);
  process.exit(1);
}
