import * as core from '@actions/core'
import * as github from '@actions/github'
import {PushEvent} from '@octokit/webhooks-definitions/schema'
import {Cargo} from '@rinse-repeat/actions-rs-core'

export async function run(): Promise<void> {
  const cargo = await Cargo.get()

  if (github.context.eventName === 'push') {
    const pushPayload = github.context.payload as PushEvent
    const commit = pushPayload.head_commit

    if (commit?.message?.startsWith('major:')) {
      await cargo.call(['bump', 'major'])
    } else if (commit?.message?.startsWith('minor:')) {
      await cargo.call(['bump', 'minor'])
    } else if (commit?.message?.startsWith('fix:')) {
      await cargo.call(['bump'])
    }
  }
}

async function main(): Promise<void> {
  try {
    await run()
  } catch (error) {
    core.setFailed((<Error>error).message)
  }
}

void main()
