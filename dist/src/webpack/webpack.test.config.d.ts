export declare const webpackTestConfig: {
    devtool: string;
    entry: {
        main: string;
        polyfills: string[];
    };
    output: {
        path: string;
        filename: string;
        chunkFilename: string;
        publicPath: string;
    };
    resolveLoader: {
        modules: string[];
    };
    module: {
        rules: ({
            test: RegExp;
            use: (string | {
                loader: string;
                query: {
                    compilerOptions: {
                        removeComments: boolean;
                    };
                };
            })[];
            exclude: RegExp[];
        } | {
            test: RegExp;
            loader: string;
            options: {
                esModules: boolean;
            };
            enforce: string;
            exclude: RegExp[];
        } | {
            test: RegExp;
            loader: string;
            query: {
                name: string;
                limit: number;
            };
        } | {
            test: RegExp;
            loader: any;
        } | {
            test: RegExp;
            exclude: string[];
            loader: any;
        } | {
            test: RegExp;
            include: string[];
            loaders: string[];
        })[];
    };
    resolve: {
        extensions: string[];
        modules: string[];
    };
    plugins: any[];
};
