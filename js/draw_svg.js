function ProcessLayerLoading()
{
    var layerUrl = loadingLayerStack.pop();
    DrawSvgToCanvas(layerUrl);
}

function DrawSvgToCanvas(url,canvas)
{
    fabric.loadSVGFromURL(url, function(objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);


        // ...any code for special handling of the loaded object


        // put object on the canvas
        canvas.add(obj);

        // get the next image
        ProcessLayerLoading();
    });
}