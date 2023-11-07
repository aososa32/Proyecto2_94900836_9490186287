import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function HomePage() {
  const imageStyle = {
    width: '300px', // Ancho deseado
    height: '200px', // Alto deseado
  };

  return (
    <div>
      <h1>Bienvenido a la tienda PANA</h1>
      <Carousel
        showArrows={true}
        centerMode={true}
        autoPlay={true} // Habilita el auto-reprodución
        interval={3000} // Establece el intervalo de tiempo en milisegundos (en este caso, 3 segundos)
      >
        <div>
          <img src="/images/prod1.jpg" alt="Imagen 1" style={imageStyle} />
          <p className="legend">porta servilletas de msa maya</p>
        </div>
        <div>
          <img src="/images/prod2.jpg" alt="Imagen 2" style={imageStyle} />
          <p className="legend">Mochila viajero Atitlan</p>
        </div>
        <div>
          <img src="/images/prod3.jpg" alt="Imagen 3" style={imageStyle} />
          <p className="legend">Muñeca de trapo</p>
        </div>
        <div>
          <img src="/images/prod4.jpg" alt="Imagen 4" style={imageStyle} />
          <p className="legend">Morrales tipicos artesanales</p>
        </div>
        <div>
          <img src="/images/prod5.jpg" alt="Imagen 5" style={imageStyle} />
          <p className="legend">Muñeca de trapo</p>
        </div>
        <div>
          <img src="/images/prod6.jpg" alt="Imagen 6" style={imageStyle} />
          <p className="legend">Morrales tipicos artesanales</p>
        </div>  
        
        {/* Agrega más imágenes y descripciones según sea necesario */}
      </Carousel>
    </div>
  );
}

export default HomePage;
