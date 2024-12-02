const TITLE_SUFFIX = '美少女 光沢紙 同人 ファンアート';
const MAX_TITLE_LENGTH = 65;

export function generateTitle(baseName: string, index: number): string {
  // Add sequential number if there are multiple images
  const numberedName = index > 0 ? `${baseName}（${index + 1}）` : baseName;
  
  // Combine with suffix
  const fullTitle = `${numberedName} ${TITLE_SUFFIX}`;
  
  // If within length limit, return full title
  if (fullTitle.length <= MAX_TITLE_LENGTH) {
    return fullTitle;
  }
  
  // Otherwise truncate while preserving the suffix
  const suffixLength = TITLE_SUFFIX.length + 1; // +1 for space
  const maxBaseLength = MAX_TITLE_LENGTH - suffixLength;
  const truncatedBase = numberedName.slice(0, maxBaseLength);
  
  return `${truncatedBase} ${TITLE_SUFFIX}`;
}