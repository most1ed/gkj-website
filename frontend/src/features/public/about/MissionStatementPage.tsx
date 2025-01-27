import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Heart, 
  Globe, 
  Users, 
  BookOpen, 
  Eye 
} from 'lucide-react';

const missionPillars = [
  {
    icon: Heart,
    title: 'Pelayanan Berbasis Kasih',
    description: 'Menunjukkan kasih Kristus melalui pelayanan yang tulus dan penuh empati'
  },
  {
    icon: Globe,
    title: 'Penginjilan & Misi',
    description: 'Menyebarkan Injil dan membawa harapan kepada masyarakat'
  },
  {
    icon: Users,
    title: 'Pembinaan Jemaat',
    description: 'Membangun iman dan karakter anggota jemaat'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function MissionStatementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16">
      <motion.div 
        className="container mx-auto px-4 max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <Target className="mx-auto mb-6 text-primary" size={64} />
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Pernyataan Misi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Komitmen kami untuk menghadirkan kasih Kristus, 
            memberdayakan jemaat, dan memberikan transformasi positif dalam masyarakat
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 mb-12 text-center"
          variants={itemVariants}
        >
          <Eye className="mx-auto mb-4 text-primary" size={48} />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Visi Kami</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Menjadi gereja yang hidup, dinamis, dan transformatif 
            yang menghadirkan kasih Kristus dalam setiap aspek kehidupan masyarakat.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {missionPillars.map((pillar, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <pillar.icon className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {pillar.title}
              </h3>
              <p className="text-gray-600">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Bergabung dalam Misi
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tertarik untuk berkontribusi dalam misi kami? 
            Mari bersama-sama membawa perubahan positif.
          </p>
          <motion.a 
            href="mailto:misi@gkjgrogoljakarta.org"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hubungi Tim Misi
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}
