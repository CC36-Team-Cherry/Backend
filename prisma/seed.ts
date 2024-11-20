import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const seedCompany = await prisma.company.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Tim's Sorting Company",
    }
  });

  const seedGuy = await prisma.account.upsert({
    where: { email: "coolguy420@hotmail.com" },
    update: {},
    create: {
      email: "coolguy420@hotmail.com",
      first_name: "Tim",
      last_name: "Peters",
      birthdate: new Date('1954-02-19'),
      is_admin: true,
      is_approver: true,
      company_id: seedCompany.id,
      days_off_remain: 1000,
      join_date: new Date('2024-11-19'),
      role: "emperor",
    }
  });

  console.log("Seed data inserted successfully:", { seedCompany, seedGuy })
}
main()
  .then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1)
})
