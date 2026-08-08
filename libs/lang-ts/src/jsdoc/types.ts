export type JsDocTags = Record<string, string | string[]>;

export type JsDocData = {
	description?: string;
	templateTags?: Record<string, string>;
	tags?: JsDocTags;
};

export type FunctionJsDocData = JsDocData & {
	paramTags?: Record<string, string>;
	returnsTag?: string;
};
