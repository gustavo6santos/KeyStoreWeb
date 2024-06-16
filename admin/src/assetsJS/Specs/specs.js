// specs.js
const specs = {
    "cpus": {
      "Intel": {
        "Core i3": {
          "Intel Core i3-8100": 5000,
          "Intel Core i3-9100F": 5500,
          "Intel Core i3-10100": 6000,
          "Intel Core i3-10320": 7000,
          "Intel Core i3-12100": 8000
        },
        "Core i5": {
          "Intel Core i5-8400": 9000,
          "Intel Core i5-9400F": 9500,
          "Intel Core i5-9600K": 12000,
          "Intel Core i5-10400": 11000,
          "Intel Core i5-10600K": 13000,
          "Intel Core i5-11400": 12000,
          "Intel Core i5-11600K": 14000,
          "Intel Core i5-12400": 13000,
          "Intel Core i5-12600K": 16000
        },
        "Core i7": {
          "Intel Core i7-8700K": 15000,
          "Intel Core i7-9700K": 16000,
          "Intel Core i7-10700K": 18000,
          "Intel Core i7-11700K": 19000,
          "Intel Core i7-12700K": 20000
        },
        "Core i9": {
          "Intel Core i9-9900K": 20000,
          "Intel Core i9-10900K": 22000,
          "Intel Core i9-11900K": 23000,
          "Intel Core i9-12900K": 24000
        }
      },
      "AMD": {
        "Ryzen 3": {
          "AMD Ryzen 3 2200G": 5000,
          "AMD Ryzen 3 3200G": 5500,
          "AMD Ryzen 3 3100": 6000,
          "AMD Ryzen 3 3300X": 7000
        },
        "Ryzen 5": {
          "AMD Ryzen 5 2600": 11000,
          "AMD Ryzen 5 3600": 13000,
          "AMD Ryzen 5 5600X": 15000,
          "AMD Ryzen 5 1600 AF": 10000,
          "AMD Ryzen 5 3400G": 9000,
          "AMD Ryzen 5 4500": 12000,
          "AMD Ryzen 5 4600G": 13000,
          "AMD Ryzen 5 5500": 14000,
          "AMD Ryzen 5 5600G": 15000
        },
        "Ryzen 7": {
          "AMD Ryzen 7 2700X": 14000,
          "AMD Ryzen 7 3700X": 18000,
          "AMD Ryzen 7 5800X": 20000,
          "AMD Ryzen 7 1700": 13000,
          "AMD Ryzen 7 3700G": 16000,
          "AMD Ryzen 7 5700G": 19000
        },
        "Ryzen 9": {
          "AMD Ryzen 9 3900X": 22000,
          "AMD Ryzen 9 5900X": 24000,
          "AMD Ryzen 9 5950X": 26000,
          "AMD Ryzen 9 3950X": 25000,
          "AMD Ryzen 9 5900": 23000
        }
      }
    },
    "gpus": {
      "NVIDIA": {
        "GTX 10 Series": {
          "NVIDIA GTX 1050": 4000,
          "NVIDIA GTX 1050 Ti": 4500,
          "NVIDIA GTX 1060 3GB": 5000,
          "NVIDIA GTX 1060 6GB": 6000,
          "NVIDIA GTX 1070": 8000,
          "NVIDIA GTX 1070 Ti": 8500,
          "NVIDIA GTX 1080": 9000,
          "NVIDIA GTX 1080 Ti": 10000
        },
        "GTX 16 Series": {
          "NVIDIA GTX 1650": 5000,
          "NVIDIA GTX 1650 Super": 6000,
          "NVIDIA GTX 1660": 7000,
          "NVIDIA GTX 1660 Ti": 8000
        },
        "RTX 20 Series": {
          "NVIDIA RTX 2060": 13000,
          "NVIDIA RTX 2060 Super": 14000,
          "NVIDIA RTX 2070": 15000,
          "NVIDIA RTX 2070 Super": 16000,
          "NVIDIA RTX 2080": 18000,
          "NVIDIA RTX 2080 Super": 19000,
          "NVIDIA RTX 2080 Ti": 20000
        },
        "RTX 30 Series": {
          "NVIDIA RTX 3060": 16000,
          "NVIDIA RTX 3060 Ti": 18000,
          "NVIDIA RTX 3070": 20000,
          "NVIDIA RTX 3070 Ti": 21000,
          "NVIDIA RTX 3080": 22000,
          "NVIDIA RTX 3080 Ti": 23000,
          "NVIDIA RTX 3090": 24000,
          "NVIDIA RTX 3090 Ti": 25000
        }
      },
      "AMD": {
        "RX 500 Series": {
          "AMD Radeon RX 550": 3000,
          "AMD Radeon RX 560": 4000,
          "AMD Radeon RX 570": 5000,
          "AMD Radeon RX 580": 6000,
          "AMD Radeon RX 590": 7000
        },
        "RX Vega Series": {
          "AMD Radeon RX Vega 56": 11000,
          "AMD Radeon RX Vega 64": 12000
        },
        "RX 5000 Series": {
          "AMD Radeon RX 5500 XT": 8000,
          "AMD Radeon RX 5600 XT": 10000,
          "AMD Radeon RX 5700": 12000,
          "AMD Radeon RX 5700 XT": 14000
        },
        "RX 6000 Series": {
          "AMD Radeon RX 6600 XT": 15000,
          "AMD Radeon RX 6700 XT": 17000,
          "AMD Radeon RX 6800": 18000,
          "AMD Radeon RX 6800 XT": 20000,
          "AMD Radeon RX 6900 XT": 22000
        }
      }
    }
  };
  
  export default specs;
  