const state = {
    blogPosts: [{
            id: 1,
            title: "Food is important",
            url: "food-is-important",
            excerpt: "lorem ipsum dipsum..",
            content: "<b>Hejsan</b> detta är ett inlägg!",
            comments: [{
                name: "Ellinor Stenhaug",
                date: "9 Januari 2019",
                content: "I totally agree!"
            }],
            img: 'https://images.unsplash.com/photo-1447078806655-40579c2520d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
        },
        {
            id: 2,
            title: "Dessert is life",
            url: "dessert-is-life",
            excerpt: "Chops ipsum dipsum..",
            content: "<b>Hejsan</b> detta är ett inlägg!",
            comments: [{
                    name: "Ellinor Stenhaug",
                    date: "9 Januari 2019",
                    content: "I totally agree!"
                },
                {
                    name: "John Dooe",
                    date: "9 Januari 2019",
                    content: "Mee to!"
                },
            ],
            img: 'https://images.unsplash.com/photo-1454944338482-a69bb95894af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2104&q=80'
        },
        {
            id: 3,
            title: "Chocolate is good for the soul",
            url: "chocolate-is-good-for-the-soul",
            excerpt: "Chops ipsum dipsum..",
            comments: [],
            content: "<b>Hejsan</b> detta är ett inlägg!",
            img: 'https://images.unsplash.com/photo-1526823127573-0fda76b6c24f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
        },
    ],
    currentPost: undefined
}
const getters = {


}
const actions = {
    AddPostToLocalStorage({
        commit
    }, post) {
        let currentLSPosts = JSON.parse(localStorage.getItem('posts'));
        let arrayToAdd;
        if (currentLSPosts !== null) {
            arrayToAdd = [...currentLSPosts, post]
        } else {
            arrayToAdd = [post]
        }
        localStorage.setItem('posts', JSON.stringify(arrayToAdd));

        commit('ADD_BLOGPOST', post)
    },
}
const mutations = {
    SET_COMMENT: (state, comment) => {

        state.blogPosts.find(blogPost => {
            if (blogPost.id == comment.postId) {
                blogPost.comments.push(comment);
                localStorage.removeItem('posts');
                localStorage.setItem('posts', JSON.stringify(state.blogPosts));
            }
        });

    },
    ADD_BLOGPOST: (state, post) => {
        state.blogPosts.unshift(post);
    },
    MERGE_BLOGPOSTS: (state) => {
        let posts = JSON.parse(localStorage.getItem('posts'));
        if (posts !== null) {
            posts = posts.reverse();
            state.blogPosts.unshift(...posts);
        }
    },
    SET_CURRENT_POST: (state, url) => {
        let post = state.blogPosts.find(post => {
            return post.url == url
        });
        if (post) {
            state.currentPost = post;
        }
        
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}