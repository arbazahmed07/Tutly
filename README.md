# Tutly

Learning Management System (LMS) with attendance tracking, assignment management, interactive code playgrounds, real-time notifications, and many more.

## Links

- 🏠 Landing Page: [https://www.tutly.in](https://www.tutly.in)
- 📚 Learning Platform: [https://learn.tutly.in](https://learn.tutly.in)
- 📄 Documentation: [https://docs.tutly.in](https://docs.tutly.in)
- 📊 Status: [https://tutly.statuspage.io/](https://tutly.statuspage.io/)

## Project Structure

```text
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  └─ web
      ├─ Next.js 15
      ├─ React 19
      └─ Tailwind CSS v4
packages
  ├─ api
  |   └─ tRPC v11 router definition
  ├─ auth
  |   └─ Custom authentication
  ├─ db
  |   └─ Typesafe db calls using Prisma
  ├─ ui
  |   └─ UI components using shadcn-ui
  └─ validators
      └─ Shared validation schemas
tooling
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  ├─ tailwind
  |   └─ shared tailwind configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```

## Getting Started

### Prerequisites

- Node.js (version specified in .nvmrc)
- pnpm

### Installation

1. Fork the repository
2. Clone your forked repository

```bash
git clone https://github.com/yourusername/tutly.git
cd tutly
```

3. Navigate to the web app directory

```bash
cd apps/web
```

4. Start the development server

```bash
make up
```

This will:

- Install all dependencies
- Set up the development environment
- Start the development server

### Development

The development server will be running at `http://localhost:3000`

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

The GNU Affero General Public License is a free, copyleft license for software and other kinds of works, specifically designed to ensure cooperation with the community in the case of network server software.

Key points of the license:

- You are free to use and modify the software for personal use
- Distribution of the software is not permitted
- You must preserve the license and copyright notices
- You must state significant changes made to the code
- The license applies to the entire work, including all its parts

For more information about the license, visit [https://www.gnu.org/licenses/agpl-3.0.html](https://www.gnu.org/licenses/agpl-3.0.html)
