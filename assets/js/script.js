const form = document.querySelector('.formAdd')
form.addEventListener('submit', function (ev){
    ev.preventDefault() //nao atualiza a pagina

    let pessoa = receberValoresDaTabela(form) //dados vindo do formulario

    let imagemCodificada = converterParaBase64(pessoa.img)
    localStorage.setItem('imagem', imagemCodificada) // add imagem no localStorage

    let row

    switch (pessoa.time) {
        case 'full_stack':
            row = document.querySelector('.full_stack')
            pessoa.corFundo = '#5cb85c'
            break;

        case 'front_end':
            row = document.querySelector('.front_end')
            pessoa.corFundo = '#0275d8'
            break;

        case 'back_end':
            row = document.querySelector('.back_end')
            pessoa.corFundo = '#f0ad4e'
            break;

        case 'data_science':
            row = document.querySelector('.data_science')
            pessoa.corFundo = '#d9534f'
            break;

        case 'mobile':
            row = document.querySelector('.mobile')
            pessoa.corFundo = '#333'
            break;

        case 'ux_design':
            row = document.querySelector('.ux_design')
            pessoa.corFundo = '#5bc0de'
            break;
            
    }

    row.appendChild(montarCard(pessoa)) // add o card na linha
})

const receberValoresDaTabela = (form) => {
    let pessoa = {
        nome: form.nome.value,
        cargo: form.cargo.value,
        imagem: form.imagem.value,
        time: form.time.value
    }
    return pessoa
}

function adicionarDescricao(pessoa){
    let nomeDescricao = document.createElement('h4') //criando um titulo h4 para o nome da pessoa
    nomeDescricao.textContent = pessoa.nome //adicionando o nome da pessoa na tag h4
    nomeDescricao.style.color = pessoa.corFundo

    let cargoDescricao = document.createElement ('p') // criando um paragrafo p
    cargoDescricao.textContent = pessoa.cargo // add o cargo da pessoa ao paragrafo p
    cargoDescricao.style.color = pessoa.corFundo

    let figcaption = document.createElement('figcaption') // criando um figcaotion
    figcaption.classList.add('text-center') // add uma classe de html ao figcaption
    figcaption.appendChild(nomeDescricao) // add o nome dentro da figcaption
    figcaption.append(cargoDescricao) // add o cargo dentro do figcaption

    return figcaption
}

function montarCard(pessoa){

    let foto = document.createElement('img')


    let figure = document.createElement('figure') // criar um figure
    figure.classList.add('card') // add classes ao figure
    figure.classList.add('ms-3')
    figure.classList.add('col-md-3')
    figure.style.backgroundImage = 'linear-gradient(to top, white 60%, '+ pessoa.corFundo +' 40%)'
    figure.appendChild(adicionarDescricao(pessoa)) // add figcaption 'descricao' ao figure

    return figure
}

// convertendo imagem para texto em base64
function converterParaBase64(imagem){
    return new Promise(resolve => {
        let reader = new FileReader()
        reader.readAsDataURL(imagem)
        reader.onload = function (){
            let imagemCodificada = reader.result.split(',')[1]
            resolve(imagemCodificada)
        }
    })
}