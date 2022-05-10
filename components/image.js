import sanityClient from '@sanity/client';
import { sanityConfig } from "../lib/config"
import { useNextSanityImage } from 'next-sanity-image';
import Img from 'next/image';

const Image = ({ data }) => {

    if(data === null) return null;

    const configuredSanityClient = sanityClient(sanityConfig);

    const imageProps = useNextSanityImage(
        configuredSanityClient,
        data
    );

    return <Img {...imageProps} layout="responsive" sizes="(max-width: 800px) 100vw, 800px" />
}

export default Image;