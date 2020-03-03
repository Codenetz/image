import sharp from 'sharp';
import { JPEG, PNG, WEBP } from '../constants/extensions';

export const Process = (resource, manipulator) => {
  let sharp_resource = sharp(resource);

  sharp_resource.resize(manipulator.getResize());

  if (manipulator.getFormat() === WEBP) {
    sharp_resource.webp(
      Object.assign(
        {
          quality: manipulator.getQuality()
        },
        manipulator.getFormatOptions()
      )
    );
  }

  if (manipulator.getFormat() === JPEG) {
    sharp_resource.jpeg(
      Object.assign(
        {
          quality: manipulator.getQuality()
        },
        manipulator.getFormatOptions()
      )
    );
  }

  if (manipulator.getFormat() === PNG) {
    sharp_resource.png(
      Object.assign(
        {
          compressionLevel: manipulator.getQuality()
        },
        manipulator.getFormatOptions()
      )
    );
  }

  return sharp_resource;
};

export const Save = async (sharp_resource, saveConfig) => {
  // eslint-disable-next-line no-undef
  return new Promise(async resolve => {
    if (saveConfig.isLocalEnabled()) {
      sharp_resource.toFile(saveConfig.getLocal().path, (err, res) => {
        resolve({
          width: res.width,
          height: res.height
        });
      });
    }
  });
};
