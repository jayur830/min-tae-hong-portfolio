export const sleep = async (milliseconds: number) => await new Promise(resolve => setTimeout(resolve, milliseconds));

export const execAsync = async (...api: (() => Promise<any>)[]) => {
    let count = 0, results: { [index: number]: any } = {};
    for (let i = 0; i < api.length; ++i)
        (async () => {
            try {
                results[i] = await api[i]();
            } catch (e) {e;} finally {
                ++count;
            }
        })();
    while (count !== api.length)
        await sleep(10);
    return results;
};
