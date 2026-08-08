export type DocsTags = Record<string, string | string[]>;

export type DocsData = {
	description?: string;
	tags?: DocsTags;
};

export type ImportedSymbol = {
	at: string;
	name: string;
	alias: string;
	from: string;
};

export type DeclaredSymbol = {
	at: string;
	lang: string;
	name: string;
	private: boolean;
};

export type LanguageDeclaredSymbol<L extends string> = DeclaredSymbol & {
	lang: L;
};

export type EntityDataBasePartial<T extends string = string> = {
	type: T;
	name: string;
	package: string;
};

export type EntityDataBase = EntityDataBasePartial &
	DocsData & {
		symbols: {
			imported: Record<string, ImportedSymbol>;
			declared: Record<string, DeclaredSymbol>;
		};
	};

export type EntityExtractContext<T extends object> = {
	context: T;
	partial: EntityDataBasePartial;
};

export type EntityExtractResult<
	T extends EntityDataBase = EntityDataBase,
	C extends object = object,
> = {
	context: EntityExtractContext<C>;
	entity: T;
	warnings?: string[];
};

export type AnonymousEntityProcessor = () => Promise<EntityExtractResult<EntityDataBase>[]>;

export type EntityDecorator<T extends EntityDataBase> = (partial: T) => EntityDataBase;
