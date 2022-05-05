export interface AdminAboutInfoModalValueType {
	confirmText: string;
	infoText: string;
	loadingText: string;
	errorText: string;
}

export interface AdminAboutCommentsTableColumnType {
	key: string;
	title: string;
	dataIndex: string | string[];
	width?: string | number;
}

export interface AdminAboutCommentsValueType {
	removeText: string;
	loadingText: string;
	infoText: string;
	errorText: string;
	columns: AdminAboutCommentsTableColumnType[];
}
