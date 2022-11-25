import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import styled from 'styled-components';

const GoogleMap = (props) => {
  const [selectedElement, setSelectedElement] = useState(true);
  const [activeMarker, setActiveMarker] = useState();

  const mapStyles = {
    width: '100%',
    height: '100%',
    borderRadius: '5px',
  };

  return (
    <Wrap>
      <Map
        google={props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 37.4023124, lng: 127.8122233 }}
      >
        <Marker
          position={{ lat: 37.124, lng: 37.111 }}
          onClick={(marker) => {
            setActiveMarker(marker);
          }}
        />

        <InfoWindow
          visible={true}
          marker={activeMarker}
          onCloseClick={() => {
            setSelectedElement(false);
          }}
        >
          <Content>
            <div className="company">하나애프비엔</div>
            <div className="content">경기 파주</div>
            <div className="model">진공포장기(TF-303)</div>
          </Content>
        </InfoWindow>
      </Map>
    </Wrap>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDQuy4QWYWQX_WvvT0JTyHYFoccEPtsvxM',
})(GoogleMap);

const Wrap = styled.div`
  .gm-style .gm-style-iw {
    padding: 1rem !important;
    border: 1px solid #007bff !important;
    border-radius: 0px !important;
  }
  .gm-style-iw-d {
    overflow: hidden !important;
  }
`;

const Content = styled.div`
  padding: 0.5rem;
  color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
  .company {
    font-family: 'Noto Sans KR', sans-serif;
    color: #323232;
    font-weight: 700;
  }
  .content {
    font-family: 'Noto Sans KR', sans-serif;
    color: #323232;
  }
  .model {
    font-family: 'Noto Sans KR', sans-serif;
    color: blue;
  }
`;
