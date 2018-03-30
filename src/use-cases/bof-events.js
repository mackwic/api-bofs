module.exports = (dateAdapter, spreadsheetRepository) => {
  return {
    async getNext (req, res) {
      const rawBofEventDate = await spreadsheetRepository.getNextBofEventDate()
      const nextBofDate = dateAdapter.parseNextBofsDate(rawBofEventDate)

      // TODO construire un objet domaine
      res.send({ date: nextBofDate })
    }
  }
}
