export const nest = (...components: any[]) => {
	return (props: any) => {
		return components.reduceRight((children, Current) => <Current {...props}>{children}</Current>, props.children);
	};
};

export const nvl = (obj: any, keyString: string, defaultValue?: any) => {
	try {
		return keyString.split('.').reduce((result: any, key: string) => {
			return result === undefined || result[key] === undefined ? defaultValue : result[key];
		}, obj);
	} catch (e) {
		return defaultValue;
	}
};

export const sleep = async (milliseconds: number) => await new Promise(resolve => setTimeout(resolve, milliseconds));

export const execAsync = async (...asyncCallbacks: (() => Promise<any>)[]) => {
	let count = 0;
	let results: { [index: number]: any } = {};
	asyncCallbacks.forEach(async (callback, i) => {
		try {
			results[i] = await callback();
		} catch (e) {
			console.log(e);
		} finally {
			++count;
		}
	});
	while (count !== asyncCallbacks.length) await sleep(10);
	return results;
};

export const range = (start: number, end: number) => {
	const rangeList = [];
	for (let i = start; i <= end; ++i) rangeList.push(i);
	return rangeList;
};

export const assignKeys = (list: any[]): any[] => {
	if (!list) return [];
	return list.map((obj, i) => ({ ...obj, key: i }));
};

export const getBase64 = (file: any) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
};

export const onKeyDownInputNumber = (e: any) => {
	if (e.key === '.' && (e as any).target.value.includes('.')) {
		e.preventDefault();
	} else if (isNaN(+e.key) && !['.', 'Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowTop', 'ArrowBottom'].includes(e.key)) {
		e.preventDefault();
	}
};
