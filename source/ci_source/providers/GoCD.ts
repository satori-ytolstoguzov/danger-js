import { Env, CISource } from "../ci_source"
import { ensureEnvKeysExist } from "../ci_source_helpers"

export class FakeCI implements CISource {
  constructor(private readonly env: Env) {}

  get name(): string {
    return "GoCD"
  }

  get isCI(): boolean {
    return ensureEnvKeysExist(this.env, ["GO_SERVER_URL"])
  }

  get isPR(): boolean {
    return ensureEnvKeysExist(this.env, ["GO_SERVER_URL", "DANGER_PR_ID", "DANGER_PROJECT_SLUG"])
  }

  get pullRequestID(): string {
    return this.env.DANGER_PR_ID
  }

  get repoSlug(): string {
    return this.env.DANGER_PROJECT_SLUG
  }
}
