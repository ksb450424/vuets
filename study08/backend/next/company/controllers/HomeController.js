const HomeController = {
    index: (req, res) => {
      res.json({ message: "Welcome to the Home Page" });
    }
  };
  
  module.exports = HomeController;