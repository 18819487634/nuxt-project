# nuxt-project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# app.html
```html
<!DOCTYPE html>
<html lang="en">

<body>
  {{ APP }}
</body>
<script type="text/javascript" src="assets/js/L2Dwidget.0.min.js"></script>
<script type="text/javascript" src="static/js/L2Dwidget.min.js"></script>
<script type="text/javascript">
  L2Dwidget.init({
    "display": {
      "superSample": 2,
      "width": 200,
      "height": 400,
      "position": "right",
      "hOffset": 0,
      "vOffset": 0
    }
  });
</script>
</html>
```


