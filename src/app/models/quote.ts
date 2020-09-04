export class Quote {
    /**
     *
     */
    
    constructor(public quote: string,
        public description: string,
        public author: string,
        public category: string,
                public id?: number) {
    }
}
