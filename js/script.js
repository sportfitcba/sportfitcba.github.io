var sortBy = (function () {
    var toString = Object.prototype.toString,
        // default parser function
        parse = function (x) { return x; },
        // gets the item to be sorted
        getItem = function (x) {
          var isObject = x != null && typeof x === "object";
          var isProp = isObject && this.prop in x;
          return this.parser(isProp ? x[this.prop] : x);
        };
        
    /**
     * Sorts an array of elements.
     *
     * @param {Array} array: the collection to sort
     * @param {Object} cfg: the configuration options
     * @property {String}   cfg.prop: property name (if it is an Array of objects)
     * @property {Boolean}  cfg.desc: determines whether the sort is descending
     * @property {Function} cfg.parser: function to parse the items to expected type
     * @return {Array}
     */
    return function sortby (array, cfg) {
      if (!(array instanceof Array && array.length)) return [];
      if (toString.call(cfg) !== "[object Object]") cfg = {};
      if (typeof cfg.parser !== "function") cfg.parser = parse;
      cfg.desc = !!cfg.desc ? -1 : 1;
      return array.sort(function (a, b) {
        a = getItem.call(cfg, a);
        b = getItem.call(cfg, b);
        return cfg.desc * (a < b ? -1 : +(a > b));
      });
    };
    
  }());

function fetchJSONData() {
    fetch("./resources/data.json", {mode:'no-cors'})
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => 
           {
                data.reverse((a, b) => a.date - b.date);
                const placeholder = document.querySelector("#producto");
                data.forEach(item => {
                    placeholder.insertAdjacentHTML("beforeend", `
                    <div class="col">
                    <div  class="card shadow-sm">
                    <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${item.img}" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></img>
                    <div class="card-body">
                      <p class="card-text">${item.descripcion}</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <button type="button" class="btn btn-sm btn-outline-secondary">${item.talle}</button>
                          <button type="button" class="btn btn-sm btn-outline-secondary">${item.precio}</button>
                          <button type="button" class="btn btn-sm btn-outline-secondary">${item.color}</button>
                        </div>
                        <small class="text-body-secondary">${item.cantidad}</small>
                      </div>
                    </div> </div>
                    </div>`);
                });

              
           }     
         )
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}
fetchJSONData();