import crypto from "crypto";

function hs(results) {
  const string = results.map(({ name }) => name).join("");
  return crypto.createHash("md5").update(string).digest("hex");
}

export default class SilverReporter {
  onFinished(results) {
    const hasFailures = results.some((test) => test.result.state === "fail");

    if (!hasFailures) {
      console.log("\x1b[32m\x1b[1m✨ All tests passed! Great job! 🎉\x1b[0m");
      console.log(
        `\x1b[32m\x1b[1m✨ Use this password for your Interview Ready Submission: ${hs(
          results
        )} \x1b[0m`
      );
    } else {
      console.log(
        "\x1b[31m\x1b[1m❌ Some tests failed. To pass on Interview Ready, you need the password after all tests passed!\x1b[0m"
      );
    }
  }
}
