const liveSocial = {
    usuarios: [
        {
            username: "guandriani"
        }
    ],
    posts: [

    ],
    readPost() {
        liveSocial.posts.forEach(({id, owner, content}) => {
            liveSocial.createPost({id, owner: owner, content: content});
        })
    },
    createPost(dados) {
        // Cria posts na memória (Array/Objeto)
        const innerId = Date.now();
        liveSocial.posts.push({
            id: dados.id || innerId,
            owner: dados.owner,
            content: dados.content,
        });
        // Cria Post no HTML
        const $postList = document.querySelector('.postList');
        $postList.insertAdjacentHTML('afterbegin', `
        <li class="post" data-id="${innerId}">
            <div class="row">
                <div class="col-11">
                    <h3>@${dados.owner}</h3>
                </div>
                <div class="col-1">
                    <button class="deleteBtn"><i class="deleteIcon fa-solid fa-trash-can"></i></button>
                </div>
            </div>
            <span contenteditable alt="Clique no texto para editar!">
                ${dados.content}
            </span>
        </li>`);
    },
    deletePost(id) {
        const updatedPostList = liveSocial.posts.filter((postAtual) => {
            return postAtual.id !== Number(id)
        })
        liveSocial.posts = updatedPostList 
    },
    updatePostContent(id, novoConteudo) {
        const updatedPost = liveSocial.posts.find((post) => {
            return post.id === Number(id);
        })
        updatedPost.content = novoConteudo
    }    
};

// Formulário de envio
const $myForm = document.querySelector('form');

// CRUD: READ
liveSocial.readPost();

// CRUD: CREATE
$myForm.addEventListener('submit', function createPostController(infosEvento) {
    infosEvento.preventDefault();
    console.log("Estamos criando um novo post!");

    const $entryCreatePost = document.querySelector('input[name="createPost"]');

    liveSocial.createPost({owner: "guandriani", content: $entryCreatePost.value});

    $entryCreatePost.value = '';
})

// CRUD: DELETE
document.querySelector('.postList').addEventListener('click', function (infosEvento){
    const currentElement = infosEvento.target.parentNode.parentNode.parentNode;
    const btnDeleteClick = infosEvento.target.classList.contains('deleteIcon');
    if(btnDeleteClick) {
        const id = currentElement.parentNode.getAttribute('data-id')
        liveSocial.deletePost(id)
        currentElement.parentNode.remove();
    }
})

// CRUD: UPDATE
document.querySelector('.postList').addEventListener('input', function (infosEvento){
    const currentElement = infosEvento.target;
    const id = currentElement.parentNode.getAttribute('data-id');

    liveSocial.updatePostContent(id, currentElement.innerText)
})