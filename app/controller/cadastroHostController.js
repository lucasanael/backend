
const cadastroHostController = require('../models/cadastroHostController');

exports.listarTodos = (req, res) => {
cadastroHostController.findAll((err, clientes) => {
if (err) {
res.status(500).send({ message: 'Erro ao buscar usuário'
});
} else {
res.send(clientes);
}
});
};

exports.buscarPorCpf = (req, res) => {
cadastroHostController.findByCpf(req.params.cpf, (err, cliente) => {
if (err) {res.status(500).send({ message: 'Erro ao buscar usuário'
});
} else if (!cliente) {
res.status(404).send({ message: 'Usuário não encontrado'
});
} else {
res.send(cliente); 

}
});
};

exports.criar = (req, res) => {
if (!req.body.nome || !req.body.email || !req.body.sexo || !req.body.dataNasc || !req.body.senha) {
res.status(400).send({ message: 'Dados incompletos!' }); //

return;
}
cadastroHostController.create(req.body, (err) => {
if (err) {
res.status(500).send({ message: 'Erro ao cadastrar usuário'
});
} else {
res.status(201).send({ message: 'Usuário criado com sucesso' });
}
});
};

exports.atualizar = (req, res) => {
if (!req.body.nome || !req.body.email || !req.body.sexo || !req.body.dataNasc || !req.body.senha) {
res.status(400).send({ message: 'Dados incompletos para atualização!' });
return;
}
cadastroHostController.update(req.params.id, req.body, (err) => {
if (err) {
res.status(500).send({ message: 'Erro ao atualizar cadastro' });
} else {res.status(200).send({ message: 'Cadastro atualizado com sucesso' });
    }
    });
    };

    exports.excluir = (req, res) => {
    cadastroHostController.delete(req.params.id, (err) => {
    if (err) {
    res.status(500).send({ message: 'Erro ao excluir cadastro'
    });
    } else {
    res.status(200).send({ message: 'Cadastro excluído com sucesso' });
    }
    });
    };
    