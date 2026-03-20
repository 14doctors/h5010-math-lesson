# 📐 When Laws Need Math

An interactive algebra lesson using real Massachusetts legislation (H.5010) to teach percentages, variables, linear functions, inequalities, and what it means when algebra gives an impossible answer.

**Built for mobile phones** — students follow along on their devices as the teacher advances through 9 steps.

## Quick Deploy to Vercel (3 commands)

### Option A: Vercel CLI (fastest)

```bash
tar xzf h5010-math-lesson.tar.gz
cd h5010-math-lesson
npm install
npx vercel --prod
```

Vercel auto-detects Vite/React and deploys. You get a URL like `h5010-math-lesson.vercel.app`.

### Option B: GitHub + Vercel (auto-deploys on push)

```bash
tar xzf h5010-math-lesson.tar.gz && cd h5010-math-lesson && npm install
git init && git add -A && git commit -m "H5010 Math Lesson"
gh repo create h5010-math-lesson --public --push --source=.
# Then: vercel.com/new → Import from GitHub → select repo → Deploy
```

### Option C: Drag-and-drop (no CLI needed)

```bash
tar xzf h5010-math-lesson.tar.gz && cd h5010-math-lesson
npm install && npm run build
# Drag the dist/ folder onto vercel.com/new
```

## Local Development

```bash
npm install && npm run dev
```

Opens at `http://localhost:5173`.

## Source

H.5010 / Initiative Petition 25-37, filed January 21, 2026, Massachusetts General Court.
