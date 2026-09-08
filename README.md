# players

Five tiny Next.js services used to exercise the deployment platform in
[iliyab09/devops](https://github.com/iliyab09/devops). That repo has the full write-up.

| service | what it does |
|---|---|
| `services/player1..4` | identical backends, name and color come from env, expose `/api/status` |
| `services/frontend` | dashboard, polls `/api/players` which fans out to the four players over cluster DNS |

Every service exposes `/api/healthz` (liveness), `/api/readyz` (readiness) and `/api/metrics` (Prometheus).

## CI

`.github/workflows/ci.yml` on every push to `main`: unit tests, docker build, Trivy scan, push to ECR tagged
with the git sha, then bump the dev image tags in the `devops` repo so Argo CD rolls it out.
Pull requests run the same minus the push. AWS access is via GitHub OIDC, there are no stored keys.

## Run one locally

```bash
cd services/player1
npm ci && PLAYER_NAME=player1 npm run dev
```
