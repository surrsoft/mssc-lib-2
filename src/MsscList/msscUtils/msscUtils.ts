// noinspection JSUnusedGlobalSymbols
export async function fnWait(duration: number) {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
}
