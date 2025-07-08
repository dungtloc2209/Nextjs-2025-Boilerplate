module.exports = ({ results }) => {
  const errors = results.filter((result) => !result.valid);
  if (errors.length === 0) {
    console.log('✅ Commit message is valid!');
    return;
  }

  console.error(`
  🚨 Invalid commit message detected!
  📝 Please use the format: <type>(<scope>): <description>
  💡 Examples:
       - feat: add new feature
       - fix(ui): fix button styling
   🔍 Valid types:
       - feat: new feature for the user
       - fix: bug fix
       - docs: documentation changes
       - style: formatting, missing semicolons, etc; no code change
       - refactor: code change that neither fixes a bug nor adds a feature
       - test: adding missing tests or correcting existing tests
       - chore: changes to the build process or auxiliary tools
       - ci: changes to the CI configuration files and scripts
       - perf: performance improvements
       - build: changes that affect the build system or external dependencies
       - revert: reverts commit
  `);
};
