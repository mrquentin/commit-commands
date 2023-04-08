import * as core from "@actions/core";
import * as github from "@actions/github";
import * as exec from "@actions/exec";
import { PushEvent } from "@octokit/webhooks-definitions/schema";

export async function run(): Promise<void> {
  if (github.context.eventName === "push") {
    const pushPayload = github.context.payload as PushEvent;
    const commit = pushPayload.head_commit;

    console.log("Push detected, bumping version...");

    if (commit?.message?.startsWith("major:")) {
      console.log("Major bump ...");
      await exec.exec("cargo", ["bump", "major"]);
    } else if (commit?.message?.startsWith("minor:")) {
      console.log("Minor bump ...");
      await exec.exec("cargo", ["bump", "minor"]);
    } else if (commit?.message?.startsWith("fix:")) {
      console.log("Patch bump ...");
      await exec.exec("cargo", ["bump", "patch"]);
    }
  }
}

async function main(): Promise<void> {
  try {
    await run();
  } catch (error) {
    core.setFailed((<Error>error).message);
  }
}

void main();
