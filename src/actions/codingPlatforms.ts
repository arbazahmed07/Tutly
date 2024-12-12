const CODECHEF_URL = "https://www.codechef.com/users/";
const CODEFORCES_URL = "https://codeforces.com/api/user.info?handles=";
const HACKERRANK_URL = "https://www.hackerrank.com/rest/hackers/";
const LEETCODE_URL = "https://leetcode.com/graphql";
const GITHUB_URL = "https://api.github.com/users/";

const LEETCODE_QUERY = `
query userPublicProfile($username: String!) {
  matchedUser(username: $username) {
    username
  }
}`;

async function verifyCodechefHandle(handle: string): Promise<boolean> {
  try {
    const response = await fetch(`${CODECHEF_URL}${handle}`, {
      mode: "no-cors"
    });
    if (!response.ok) return false;
    const text = await response.text();
    return text.includes("user-profile-container");
  } catch {
    return false;
  }
}

async function verifyCodeforcesHandle(handle: string): Promise<boolean> {
  try {
    const response = await fetch(`${CODEFORCES_URL}${handle}`);
    if (!response.ok) return false;
    const data = await response.json();
    return data.status === "OK";
  } catch {
    return false;
  }
}

async function verifyHackerrankHandle(handle: string): Promise<boolean> {
  try {
    const response = await fetch(`${HACKERRANK_URL}${handle}`, {
      mode: "no-cors"
    });
    if (!response.ok) return false;
    const data = await response.json();
    return data.model?.username === handle && data.status === true;
  } catch {
    return false;
  }
}

async function verifyLeetcodeHandle(handle: string): Promise<boolean> {
  try {
    const response = await fetch(LEETCODE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: LEETCODE_QUERY,
        variables: { username: handle },
      }),
    });
    
    if (!response.ok) return false;
    const data = await response.json();
    return !data.errors && data.data.matchedUser;
  } catch {
    return false;
  }
}

async function verifyGithubHandle(handle: string): Promise<boolean> {
  try {
    const response = await fetch(`${GITHUB_URL}${handle}`);
    return response.ok;
  } catch {
    return false;
  }
}

export async function validatePlatformHandles(handles: Record<string, string>) {
  const invalidHandles: string[] = [];

  for (const [platform, handle] of Object.entries(handles)) {
    if (!handle) continue;

    let isValid = false;
    
    switch (platform) {
      case "codechef":
        isValid = await verifyCodechefHandle(handle);
        break;
      case "codeforces":
        isValid = await verifyCodeforcesHandle(handle);
        break;
      case "hackerrank":
        isValid = await verifyHackerrankHandle(handle);
        break;
      case "leetcode":
        isValid = await verifyLeetcodeHandle(handle);
        break;
      case "github":
        isValid = await verifyGithubHandle(handle);
        break;
    }
    
    if (!isValid) {
      invalidHandles.push(platform);
    }
  }
  
  return {
    valid: invalidHandles.length === 0,
    invalidFields: invalidHandles
  };
}
