export type ListeningTextBlock =
	| { readonly kind: "heading"; readonly text: string }
	| { readonly kind: "tip" | "paragraph" | "note" | "example"; readonly text: string }
	| { readonly kind: "list" | "options"; readonly items: readonly string[] }
	| { readonly kind: "question"; readonly title: string; readonly options?: readonly string[]; readonly tracks?: readonly number[] };

export type ListeningTextPage = {
	readonly page: number;
	readonly blocks: readonly ListeningTextBlock[];
};

export type ListeningStructuredSection = {
	readonly number: number;
	readonly title: string;
	readonly subtitle: string;
	readonly firstTrack: number;
	readonly pages: readonly ListeningTextPage[];
	readonly answerPages: readonly number[];
};

export type ListeningAnswerText = {
	readonly number: number;
	readonly answer: string;
	readonly transcript: string;
};
