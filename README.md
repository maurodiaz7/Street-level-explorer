## Street-level-explorer

(Work in progress) This is an interactive visualization tool for urban data. It comprises three views: map view, street-level view and CrimeGPT (to be added). Each bar in the map view represents a crime hotspot, where the bar height roughly indicates the amount of crimes that happened in that location. We only include crime data from 2018 for this prototype. Clicking on a hotspot reveals the images corresponding to that location. The images correspond to the year 2018. The objective is to allow for interactive exploration of images obtained via Google Street View on crime hotspots. To that aim, we include segmented images obtained using `deeplabv3_xception65_ade20k` model from `PixelLib`. The most predominant object class in the images is shown as the color of the bar. Our ultimate goal is to combine object presence data, spatio-temporal crime data and LLMs to visualize crime-patterns and their underlying causes.

### Installation Steps
1. **Step 1**: Download the image data from https://drive.google.com/file/d/1KI5O-cdaOcYiq1jsn8cCYEzHygql69pK/view?usp=sharing and extract it in the folder `static\images\`
1. **Step 2**: Run a python server with `python -m http.server` in the base directory.
2. **Step 3**: Access http://0.0.0.0:8000/index2.html on your preferred browser.

### Prototype
![Original CriPAV](images/prototype.png)

### Project Demonstration Video
 - [Watch on Google Drive](https://drive.google.com/file/d/18vTgMZ1opPqp_MHrucx4PStgC5Odhg86/view)

### Next steps
- Add support for multiple time resolutions. Thus far, data for the whole year is visualized.
- Allow the visualization of multiple time frames to visualize the changing nature of crime data. 
- Integrate LLMs in the third component in our tool. Take advantage of LLMs further analyze crime-patterns and also produce trajectory recommendations for pedestrians.

