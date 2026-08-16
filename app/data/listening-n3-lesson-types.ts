export type ListeningLessonBlock =
	| {
			readonly type: "hero";
			readonly no: number;
			readonly title: string;
			readonly kana?: string;
			readonly en?: string;
			readonly cn?: string;
			readonly kr?: string;
	  }
	| { readonly type: "slogan"; readonly jp: string; readonly en?: string; readonly cn?: string; readonly kr?: string }
	| { readonly type: "h"; readonly jp: string; readonly cn?: string }
	| { readonly type: "p"; readonly jp: string; readonly cn?: string; readonly en?: string }
	| { readonly type: "tip"; readonly jp: string; readonly en?: string; readonly cn?: string; readonly kr?: string }
	| { readonly type: "steps"; readonly label: string; readonly items: readonly string[] }
	| { readonly type: "table"; readonly title?: string; readonly rows: readonly (readonly string[])[] }
	| {
			readonly type: "kv";
			readonly title?: string;
			readonly rows: readonly { readonly k: string; readonly v: string; readonly extra?: string }[];
	  }
	| {
			readonly type: "box";
			readonly title?: string;
			readonly items: readonly { readonly title: string; readonly lines: readonly string[]; readonly note?: string }[];
	  }
	| { readonly type: "figure"; readonly src: string; readonly alt: string; readonly caption?: string }
	| { readonly type: "example"; readonly title?: string; readonly lines: readonly string[] }
	| { readonly type: "aside"; readonly title: string; readonly text: string }
	| { readonly type: "note"; readonly text: string }
	| {
			readonly type: "q";
			readonly label: string;
			readonly tracks?: readonly number[];
			readonly prompt?: string;
			readonly example?: string;
			readonly options?: readonly string[];
			readonly figure?: string;
			readonly figureAlt?: string;
			readonly note?: string;
	  };

export type ListeningLesson = {
	readonly blocks: readonly ListeningLessonBlock[];
	readonly answer: string;
	readonly transcript: string;
};
