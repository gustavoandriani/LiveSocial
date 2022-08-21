const liveSocial = {
    usuarios: [
        {
            username: "guandriani"
        }
    ],
    posts: [
        {
            id: 1,
            owner: "guandriani",
            content: "Minha primeira postagem"
        }
    ],
    createPost(dados) {
        // Cria posts na memória (Array/Objeto)
        liveSocial.posts.push({
            id: liveSocial.posts.length + 1,
            owner: dados.owner,
            content: dados.content,
        });
        // Cria Post no HTML
        const $postList = document.querySelector('.postList');
        $postList.insertAdjacentHTML('afterbegin', `<li class="post"><h3>@${dados.owner}</h3>${dados.content}</li>`);
    }
};

const $myForm = document.querySelector('form');

$myForm.addEventListener('submit', function createPostController(infosEvento) {
    infosEvento.preventDefault();
    console.log("Estamos criando um novo post!");

    const $entryCreatePost = document.querySelector('input[name="createPost"]');

    liveSocial.createPost({owner: "guandriani", content: $entryCreatePost.value});

    $entryCreatePost.value = '';
})