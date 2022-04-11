export interface DescriptionType {
	name: string;
	label: string;
	single: boolean;
}

export interface ContentDataType {
	descriptions: DescriptionType[];
}

export interface DarkModeProps {
	'dark-mode': string;
}
