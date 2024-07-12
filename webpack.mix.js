const mix = require('laravel-mix');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const fs = require('fs');
const _ = require('lodash');


mix.version();

// Home  App
mix.js('src/app.js', 'public').setPublicPath('public').react();
mix.css('src/App.css', 'public/app.css');
mix.copy("index.html", "public/index.html")
    .version();


// Common CSS  App
// mix.sass('src/common.scss', 'dist/common.css')
//     .version();

// add random version number to clear cache 
mix.then(() => {
    let files = ['index.html', 'user/index.html', 'admin/index.html']
    let hash = Array(10).fill(0).map(() => Math.random().toString(36).charAt(2)).join('');

    files.forEach(file => {
        try {
            let htmlFileContent = fs.readFileSync(file, 'utf8');
            let regex = /\?hash=[^"]+"/g;
            htmlFileContent = htmlFileContent.replace(regex, `?hash=${hash}"`);
            fs.writeFileSync(file, htmlFileContent);
            console.log(`Updated hash in ${file}`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    });
});

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        resourceQuery: /url/, // foo.svg?url
                        use: 'file-loader',
                    },
                    {
                        use: ['@svgr/webpack'],
                    },
                ],
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            server: { baseDir: ['./'] },
            port: 3002,
            files: [
                'dist/*', // Watch for changes in the dist folder
                'src/*', // Watch for changes in the src folder
            ]
        })
    ]
});