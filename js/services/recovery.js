// import { db, save, load } from "../data/database.js";
// load();

const levenshteinFunction = (a, b) => {
    const dp = Array.from({ length: b.length + 1 },
    (_, i) => [i, ...Array(a.length).fill(0)]);
    dp[0] = [...Array(a.length + 1).keys()];

    for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
            dp[j][i] = a[i-1] === b[j-1]
            ? dp[j-1][i-1]
            : 1 + Math.min(dp[j-1][i], dp[j][i-1], dp[j-1][i-1]);
        };
    };
    return dp[b.length][a.length];
};
const similarity = (a, b) => {
    if (!a || !b) return 0;
    const maxLen = Math.max(a.length, b.length);
    return Math.round((1 - levenshteinFunction(a, b) / maxLen) * 100);
}
const isMatch = (userWord, user, threshold = 70/*%*/) => {
    const a = userWord.toLowerCase().trim();
    const b = user.password.toLowerCase().trim();
    const sim = similarity(a, b);
    return { result: sim >= threshold};
}

// Використання
console.log(isMatch("привіт", config));  // { result: true,  similarity: 100 }
console.log(isMatch("привід", config));  // { result: true,  similarity: 83  }
console.log(isMatch("дякую",  config));  // { result: false, similarity: 17  }