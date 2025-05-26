// /utilities/parseVotesFromConclusion.js

export const parseVotesFromConclusion = (conclusion) => {
  if (!conclusion) return { ja: 0, nej: 0, uden: 0 };

  const jaMatch = conclusion.match(/For stemte (\d+)/i);
  const nejMatch = conclusion.match(/Imod stemte (\d+)/i);
  const udenMatch = conclusion.match(/hverken for eller imod stemte (\d+)/i);

  const ja = jaMatch ? parseInt(jaMatch[1], 10) : 0;
  const nej = nejMatch ? parseInt(nejMatch[1], 10) : 0;
  const uden = udenMatch ? parseInt(udenMatch[1], 10) : 0;

  console.log("Vote parsing result:", { ja, nej, uden }); // your log here

  return { ja, nej, uden };
};
