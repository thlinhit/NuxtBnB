export default function (_context, inject) {
  let mapLoaded = false
  let mapWaiting = null

  addScript()
  inject('maps', {
    showMap,
  })

  function addScript() {
    const script = document.createElement('script')
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCsKXrZB1kSA-Xw4FqmqhDNNHhP__Homtw&libraries=places&callback=initMap'
    script.async = true
    window.initMap = initMap // As Google Map needs a global function to call
    document.head.appendChild(script)
  }

  function initMap() {
    mapLoaded = true
    if (mapWaiting) {
      const { canvas, lat, lng } = mapWaiting
      renderMap(canvas, lat, lng)
      mapWaiting = null
    }
  }

  function showMap(canvas, lat, lng) {
    if (mapLoaded) {
      renderMap(canvas, lat, lng)
    } else {
      mapWaiting = { canvas, lat, lng }
    }
  }
  function renderMap(canvas, lat, lng) {
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
    }
    const map = new window.google.maps.Map(canvas, mapOptions)
    const position = new window.google.maps.LatLng(lat, lng)
    const marker = new window.google.maps.Marker({
      position,
    })
    marker.setMap(map)
  }
}
