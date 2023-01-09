export interface INavAttribute {
	name: string;
}

export interface INav {
	id: number;
	attributes: INavAttribute;
}

export interface IpageData {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface IResourceMeta {
	pagination: IpageData;
}

export interface IFacebookCollections<collect> {
	data: collect;
	meta: IResourceMeta;
}
