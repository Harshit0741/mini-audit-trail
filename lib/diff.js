export function getWordDiff(oldText, newText) {
  const oldWords = oldText.trim().split(/\s+/);
  const newWords = newText.trim().split(/\s+/);

  const addedWords = newWords.filter(w => !oldWords.includes(w));
  const removedWords = oldWords.filter(w => !newWords.includes(w));

  return {
    addedWords,
    removedWords,
    oldLength: oldText.length,
    newLength: newText.length,
  };
}
