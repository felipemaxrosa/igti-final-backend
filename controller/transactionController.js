const transactionModel = require("../models/TransactionModel.js");

module.exports = {
  async findAll(req, res) {
    const period = req.query.period;

    try {
      const transactions = await transactionModel.find({
        yearMonth: period,
      });
      const countTransactions = transactions.length;

      if (!transactions) {
        res.status(404).send({ message: "Nenhuma informação encontrada!" });
      }
      res.send({ length: countTransactions, transactions });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async findOne(req, res) {
    const id = req.params.id;
    try {
      const transaction = await transactionModel.find({ _id: id });

      if (transaction.length < 1) {
        res
          .status(404)
          .send({ message: `Transação - ID: ${id} - nao encontrada!` });
      }
      res.send(transaction);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async create(req, res) {
    try {
      const transaction = new transactionModel(req.body);
      await transaction.save();

      res.send(transaction);
    } catch (error) {
      res
        .status(500)
        .send({ message: `Erro ao salvar transacao: ${error.message}` });
    }
  },
  async update(req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: "Dados para atualizacao vazio",
      });
    }

    try {
      const id = req.params.id;
      const transaction = await transactionModel.findOneAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
        }
      );

      if (!transaction) {
        res.status(404).send("Transação não encontrada!");
      }
      res.send(transaction);
    } catch (error) {
      res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    }
  },
  async remove(req, res) {
    const id = req.params.id;

    try {
      const transaction = await transactionModel.findOneAndDelete({ _id: id });
      if (!transaction) {
        res.status(404).send({ message: "Transacao não encontrada!" });
      }
      res.send({ message: "Transacao excluida com sucesso" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Nao foi possivel deletar a transacao de id: " + id });
    }
  },
  async removeAll(req, res) {
    try {
      await transactionModel.deleteMany();
      res.send({
        message: `Todas as transacoes foram excluidas!`,
      });
    } catch (error) {
      res.status(500).send({ message: "Erro ao excluir todas as Transacoes" });
    }
  },
};
