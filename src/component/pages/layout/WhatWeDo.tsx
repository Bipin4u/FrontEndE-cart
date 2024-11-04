import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../css/WhatWeDo.css';
import customDesignImage from '../../assets/images/Gemini_Generated_Image_8spl6a8spl6a8spl.jpeg'; // Update with actual image path
import bulkProductionImage from '../../assets/images/Gemini_Generated_Image_hzdvhlhzdvhlhzdv.jpeg'; // Update with actual image path
import globalDeliveryImage from '../../assets/images/Gemini_Generated_Image_7a8o9d7a8o9d7a8o.jpeg'; // Update with actual image path

const WhatWeDo = () => {
    const { ref: ref1, inView: inView1 } = useInView({
        triggerOnce: true,
        threshold: 0.6
    });

    const { ref: ref2, inView: inView2 } = useInView({
        triggerOnce: true,
        threshold: 0.6
    });

    const { ref: ref3, inView: inView3 } = useInView({
        triggerOnce: true,
        threshold: 0.6
    });

    return (
        <div className="what-we-do-container">
            <h2 className="heading">What We Do</h2>

            <motion.div
                className="section"
                ref={ref1}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: inView1 ? 1 : 0, y: inView1 ? 0 : 50 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <img src={customDesignImage} alt="Custom Design" className="WhatWeDIImage" />
                <div className="text-content">
                    <h3 className="subheading">Custom Design</h3>
                    <p className="text">
                        We transform your unique design ideas into beautifully crafted furniture that perfectly suits your style and needs. Whether it's a modern piece or a classic design, our team brings your vision to life with precision and care.
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="section reverse"
                ref={ref2}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: inView2 ? 1 : 0, y: inView2 ? 0 : 50 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <img src={bulkProductionImage} alt="Bulk Production" className="WhatWeDIImage" />
                <div className="text-content">
                    <h3 className="subheading">Bulk Production</h3>
                    <p className="text">
                        Need furniture in large quantities? We've got you covered. Our expertise in bulk production allows us to maintain high-quality craftsmanship while meeting your demands efficiently and on time.
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="section"
                ref={ref3}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: inView3 ? 1 : 0, y: inView3 ? 0 : 50 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <img src={globalDeliveryImage} alt="Global Delivery" className="WhatWeDIImage" />
                <div className="text-content">
                    <h3 className="subheading">Global Delivery</h3>
                    <p className="text">
                        No matter where you are in the world, we deliver. Our international shipping services ensure that your custom-made furniture reaches you safely and promptly, bringing exceptional design to your doorstep.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default WhatWeDo;
