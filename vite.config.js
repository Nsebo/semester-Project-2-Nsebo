const { resolve } = require('path');

export default {
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'login.html'),
                createProduct: resolve(__dirname, 'create-product.html'),
                myPosts: resolve(__dirname, 'my-posts.html'),
                products: resolve(__dirname, 'products.html'),
                profile: resolve(__dirname, 'profile.html'),
                signup: resolve(__dirname, 'signup.html'),
                singleListing: resolve(__dirname, 'single-listing.html'),
            },
        },
    },
};
