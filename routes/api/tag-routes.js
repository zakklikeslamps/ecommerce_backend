const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {

  // find all tags
  // be sure to include its associated Product data
  try {
    const tagdata = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });

    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {

  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });

    if (!tagData) {
      res.status(404).json({ message: "Tag ID could not be found" });
      return; 
    }

    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {

  // create a new tag
  try {

    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);

  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', (req, res) => {

  // update a tag's name by its `id` value
  Tag.update(

    {
      tag_name: req.body.tag_name
    }, 

   {
     where: {
       id: req.params.id
     }
   } 

  ) .then((updatedTag) => {
    res.json(updatedTag);
  })
  
  .catch((err) => {
    console.log(err);
    res.json(err);
  })

});

router.delete('/:id', async (req, res) => {

  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (!tagData) {
      res.status(404).json({ mesage: "Tag ID could not be found" });
      return; 
    }

    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;
