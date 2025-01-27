export function VisionMission() {
  return (
    <section className="grid md:grid-cols-2 gap-12">
      {/* Vision */}
      <div className="space-y-6">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-lg">
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold">Visi Kami</h2>
        <p className="text-xl text-muted-foreground">
          "Menjadi gereja yang berakar kuat dalam iman dan memberkati dunia."
        </p>
        <div className="bg-secondary/50 rounded-2xl p-6">
          <p className="text-muted-foreground">
            Visi ini mencerminkan komitmen kami untuk membangun fondasi iman yang kokoh
            dalam Kristus dan menjadi berkat bagi sesama melalui pelayanan yang nyata.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="space-y-6">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-lg">
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold">Misi Kami</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <div className="flex-none w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Membentuk Jemaat yang Bertumbuh dalam Iman</h3>
              <p className="text-muted-foreground">
                Memfasilitasi pertumbuhan rohani jemaat melalui pembinaan, pembelajaran Alkitab, dan ibadah yang menguatkan.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex-none w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">Melayani Sesama Melalui Tindakan Nyata</h3>
              <p className="text-muted-foreground">
                Mengimplementasikan kasih Kristus melalui pelayanan sosial dan kepedulian terhadap sesama.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex-none w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Mengembangkan Komunitas yang Kuat</h3>
              <p className="text-muted-foreground">
                Membangun komunitas yang saling mendukung dan menguatkan dalam iman dan kehidupan sehari-hari.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
