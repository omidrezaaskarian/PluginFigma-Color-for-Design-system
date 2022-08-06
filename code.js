//show the plugin ui
figma.showUI(__html__, { width: 320, height: 640, title: "Color tint Generate" });
//message receive
figma.ui.onmessage = msg => {
    if (msg.type === 'actionGenerate') {
        const { circleSize, circleSpacing, colorCode, colorName, frameDirection, tintNumber } = msg.formDataObj;
        //Create the frame and name it
        const parentFrame = figma.createFrame();
        parentFrame.name = 'Tint for the' + ' ' + colorName + ' ' + 'color';
        // add auto layout to the fram and setting padding and spacing
        parentFrame.layoutMode = frameDirection.toUpperCase();
        parentFrame.paddingLeft = 64;
        parentFrame.paddingRight = 64;
        parentFrame.paddingBottom = 64;
        parentFrame.paddingTop = 64;
        parentFrame.itemSpacing = parseInt(circleSpacing);
        //hug or fixed position of X and Y
        parentFrame.primaryAxisSizingMode = 'AUTO';
        parentFrame.counterAxisSizingMode = 'AUTO';
        //generate the tints as ellipses
        for (let i = 0; i < tintNumber; i++) {
            const tintNode = figma.createEllipse();
            tintNode.name = colorName + ' ' + (100 - i * 10);
            tintNode.resize(parseInt(circleSize), parseInt(circleSize));
            //convert the HEX value to RGB
            function hexToRgb(hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            }
            const colorR = hexToRgb(colorCode).r / 255;
            const colorG = hexToRgb(colorCode).g / 255;
            const colorB = hexToRgb(colorCode).b / 255;
            tintNode.fills = [{ type: 'SOLID', color: { r: colorR, g: colorG, b: colorB } }];
            tintNode.opacity = (100 - i * 10) / 100;
            parentFrame.appendChild(tintNode);
            // select and zoom to the generateed frame
            const selectFrame = [];
            selectFrame.push(parentFrame);
            figma.currentPage.selection = selectFrame;
            figma.viewport.scrollAndZoomIntoView(selectFrame);
        }
        //close the plugin
        figma.closePlugin('Tints generate successfuly!');
    }
    else if (msg.type === 'actionExit') {
        figma.closePlugin('tahnks for use it');
    }
};
