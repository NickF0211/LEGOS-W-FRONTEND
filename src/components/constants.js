export const defaultEditorsValue = {
    firstDefault:
        `from type_constructor import create_type, create_action, create_pair_action
type_dict = dict()

N = 10000
nat = create_type("nat", type_dict, lower_bound=0, upper_bound=N)
t = create_type("time", type_dict, lower_bound=0)
    
Magic = create_action("Magic", [("x", "nat"), ("y", "nat"), ("time", "time")],type_dict)
TimeStamp = create_action("TimeStamp", [("time", "time")],type_dict)
    
ACTION = [TimeStamp, Magic]
state_action = [TimeStamp]`,
    secondDefault:
        `def number_of_y(x):
    return Count(Magic, lambda m1: EQ(m1.y, x))
complete_rules = []
complete_rules = add_background_theories(ACTION, state_action, complete_rules)
N = 500
# Magic property
complete_rules.append(forall(Magic, lambda m: Implication(m.x > 0, EQ(m.y, number_of_y(m.x)))))

# function definition
complete_rules.append(forall([Magic, Magic], lambda m1, m2: Implication(EQ(m1.x, m2.x), EQ(m1, m2))))

# value bound on the x and y
complete_rules.append(forall(Magic, lambda m: AND(m.x < N, m.y <= N)))

# if f(x) > 0, then f(f(x)) > 0
complete_rules.append(
    forall(Magic, lambda m: Implication(m.y > 0, exist(Magic, lambda m1: AND(EQ(m1.x, m.y), m1.y > 0)))))`,
    thirdDefault: `rule = exist(Magic, lambda m: AND(EQ(m.x, Int(0)), EQ(Int(N) - m.y, Count(Magic, lambda m: m.y > 0))))`
}

export const defaultCompletions = [
    { "label": "NOT", "type": "constant", "info": "NOT (arg)" },
    { "label": "AND", "type": "constant", "info": "AND ([args])" },
    { "label": "EQ", "type": "constant", "info": "EQ (left, right)" },
    { "label": "NEQ", "type": "constant", "info": "NEQ (left, right)" },
    { "label": "OR", "type": "constant", "info": "OR ([args])" },
    { "label": "LT", "type": "constant", "info": "LT (left, right)" },
    { "label": "GT", "type": "constant", "info": "GT (left, right)" },
    { "label": "ITE", "type": "constant", "info": "ITE (cond, left, right)" },
    { "label": "IFF", "type": "constant", "info": "IFF (left, right)" },
    { "label": "forall", "type": "constant", "info": "forall (action, function)" },
    { "label": "exist", "type": "constant", "info": "exist (self, input_type, function)" },
    { "label": "Implication", "type": "constant", "info": "Implication (right, left)" },
    { "label": "previous", "type": "constant", "info": "previous (Action_class, idenifier_func, func, current_time = Int(0))" },
    { "label": "next", "type": "constant", "info": "next (Action_class, idenifier_func, func, current_time = Int(0))" },
    { "label": "current", "type": "constant", "info": "current (Action_class, idenifier_func, func, current_time = Int(0))" },
    { "label": "eventually", "type": "constant", "info": "eventually (EAction_class, func, current_time = Int(0))" },
    { "label": "once", "type": "constant", "info": "once (Action_class, func, current_time)" },
    { "label": "until", "type": "constant", "info": "until (EAction, func, Faction, func1, current_time)" },
    { "label": "since", "type": "constant", "info": "since (EAction, func, Faction, func1, current_time)" },
]

export const firstEditorPHIM = `from type_constructor import create_type, create_action, create_pair_action
type_dict = dict()
t = create_type("time", type_dict, lower_bound=0, upper_bound=100000)
sid = create_type("sid", type_dict, lower_bound = 0, upper_bound = 100)
aid = create_type("aid", type_dict, lower_bound = 0, upper_bound = 1000)
pid = create_type("pid", type_dict, lower_bound = 0, upper_bound = 5000)
pvalue = create_type("pvalue", type_dict)
purpose = create_type("purpose", type_dict, lower_bound=0, upper_bound=2)
expertise = create_type("expertise", type_dict, lower_bound=0, upper_bound=3)
action = create_type("action", type_dict, lower_bound=1, upper_bound=2)
message = create_type("message", type_dict, lower_bound=0, upper_bound=10)
balance = create_type("balance", type_dict, lower_bound=0)
TimeStamp = create_action("TimeStamp", [("time", "time")],type_dict, abstraction=False)
Balance = create_action("Balance", [("time", "time"), ("subject", "sid"), ("balance", "balance")], type_dict, abstraction=False)
Collect = create_action("Collect", [("time", "time"), ("subject", "sid"),
                                    ("pid", "pid"), ("pvalue", "pvalue"), ("purpose","purpose")],type_dict)
Notify = create_action("Notify", [("time", "time"), ("subject", "sid"),
                                    ("message", "message")],type_dict)
Request_Update, Update = create_pair_action("Update", [("time", "time"), ("subject", "sid"),
                                    ("pid", "pid"), ("pvalue", "pvalue")],type_dict)
Has_Expertise = create_action("Has_Expertise",  [("time", "time"),
                                                 ("expertise", "expertise"), ("purpose", "purpose")],type_dict)
Request_Access = create_action("Request_Access", [("time", "time"),
                                                 ("pid", "pid"), ("a1", "aid")],type_dict)
Access = create_action("Access", [("time", "time"),
                                                 ("pid", "pid"), ("a1", "aid"), ("pvalue", "pvalue")],type_dict)
Request_Use = create_action("Request_Use", [("time", "time"),
                                                 ("pid", "pid"), ("a1", "aid")],type_dict)
Use = create_action("Use", [("time", "time"),
                                                 ("pid", "pid"), ("a1", "aid")],type_dict)
Request_Disclose = create_action("Request_Disclose", [("time", "time"),
                                                 ("a1", "aid"), ("pid", "pid"), ("pvalue", "pvalue"),
                                      ("a2", "aid")],type_dict)
Disclose = create_action("Disclose", [("time", "time"),
                                                 ("a1", "aid"), ("pid", "pid"), ("pvalue", "pvalue"),
                                      ("a2", "aid")],type_dict)
Request_Consent =create_action("Request_Consent", [("time", "time"),
                                                 ("action", "action"), ("a1", "aid"), ("pid", "pid"),
                                      ("a2", "aid")], type_dict)
Consent = create_action("Consent", [("time", "time"),
                                                 ("action", "action"), ("a1", "aid"), ("pid", "pid"),
                                      ("a2", "aid")], type_dict)
Patient_Consent = create_action("Patient_Consent", [("time", "time"),("subject", "sid")], type_dict)
Authorize= create_action("Authorize", [("time", "time"),
                                                 ("permission", "action"), ("a1", "aid"), ("pid", "pid")], type_dict)
Revoke = create_action("Revoke",  [("time", "time"),  ("a1", "aid"), ("pid", "pid")], type_dict)
Assign_Expertise = create_action("Assign_expertise",  [("time", "time"),  ("expertise", "expertise"), ("a1", "aid")], type_dict)
Request_Erase, Erase = create_pair_action("Erase", [("subject", "sid"), ("pid", "pid"), ("time", "time")], type_dict)
Request_Patient_Access, Patient_Access = create_pair_action("Patient_Access", [("subject", "sid"), ("pid", "pid"),  ("pvalue", "pvalue"), ("time", "time")], type_dict)
Request_Action = [Request_Access, Request_Consent, Request_Disclose, Request_Use, Request_Erase, Request_Patient_Access, Request_Update]
ACTION = Request_Action + [Patient_Access, Collect, Update, Has_Expertise, Access, Disclose, Consent, Authorize, Revoke, Assign_Expertise, Patient_Consent, Use, Erase, TimeStamp , Balance]
ACTION_MAP = {}
for act in ACTION:
    ACTION_MAP[act.action_name.upper()] = act
#additional correction if needed
ACTION_MAP.update( { "Collect".upper(): Collect, "Update".upper():Update, "Has_Expertise".upper(): Has_Expertise, "Access".upper(): Access, "Disclose".upper(): Disclose,
               "Consent".upper() : Consent, "Authorize".upper(): Authorize, "Revoke".upper(): Revoke, "Assign_Expertise".upper(): Assign_Expertise,
               "Patient_consent".upper(): Patient_Consent, "USE":Use})
state_action = [Balance, TimeStamp]`
export const secondEditorPHIM = `########################################################################
# Shortcuts
########################################################################
EQ = Equals
NEQ = NotEquals
########################################################################
# Declarative model
########################################################################

def get_action_name(action_id):
    if action_id == 1:
        return "access"
    elif action_id == 2:
        return "disclose"

action_iteration_bound = 1000

#pid starts with pid 0
root_pid = forall(Collect, lambda collect1 : Implication(GT(collect1.pid, Int(0)),
                                                             exist(Collect, lambda collect2: AND(EQ(collect2.pid, Int(0)), collect2 < collect1))))

# patient id unique and increasing
incrementing_pid = forall(Collect, lambda collect1 : Implication(GT(collect1.pid, Int(0)),
                                                             OR(exist(Collect, lambda collect2: And(
                                                                 (EQ(collect1.pid, Plus(collect2.pid, Int(1)))),
                                                             collect2 < collect1)))))

#pids are collected in order
increasing_pid = forall(Collect, lambda collect1 : forall(Collect, lambda collect2: Implication(collect1 > collect2,
                                                                                                 GT(collect1.pid, collect2.pid))))

# A data can be collected only once
no_double_collect = forall(Collect, lambda c1: forall(Collect, lambda c2: Implication(NOT(c1.build_eq_constraint(c2)),
                                                                                      NEQ(c1.pid, c2.pid))))

#update after collection but before deletion
update_after_collection = forall(Request_Update, lambda update: once(Collect, lambda collect: AND(
                                                                                           EQ(collect.pid, update.pid),
                                                                                           EQ(collect.subject, update.subject),
                                                                                                   NOT(exist(Erase, lambda erase: AND(
                                                                                                             erase <= update,
                                                                                                             erase >= collect,
                                                                                                             EQ(erase.pid, collect.pid))
                                                                                                             ))), update.time))

#a pid can be accessed only if it has been collected
access_after_collection = forall(Access, lambda access: exist(Collect, lambda collect: AND(collect < access,
                                                                                           EQ(collect.pid, access.pid))))

#the value of access is the most update to date
access_up_to_date_u =  forall(Access, lambda access: forall(Update, lambda update: Implication(AND(update < access,
                                                                                           EQ(update.pid, access.pid),
                                                                                      NEQ(update.pvalue, access.pvalue)),
                                                                                              exist(Update, lambda update1:
                                                                                                    AND(update1 < access,
                                                                                                        update1 > update,
                                                                                                        EQ(update1.pid,
                                                                                                               access.pid),
                                                                                                        EQ(update1.pvalue,
                                                                                                               access.pvalue))))))

access_up_to_date_c =  forall(Access, lambda access: forall(Collect, lambda update: Implication(AND(update < access,
                                                                                           EQ(update.pid, access.pid),
                                                                                      NEQ(update.pvalue, access.pvalue)),
                                                                                              exist(Update, lambda update1:
                                                                                                    AND(update1 < access,
                                                                                                        update1 > update,
                                                                                                        EQ(update1.pid,
                                                                                                               access.pid),
                                                                                                        EQ(update1.pvalue,
                                                                                                               access.pvalue))))))
access_up_to_date = AND(access_up_to_date_c, access_up_to_date_u)

access_not_deleted = forall([Access, Erase], lambda ac, er: Implication(EQ(ac.pid, er.pid),
                                                                        ac < er))

request_to_update_fullfilled = forall(Request_Update, lambda ur: exist(Update, lambda update:
                                                                       AND(EQ(ur.pid, update.pid),
                                                                           EQ(ur.subject, update.subject),
                                                                           EQ(ur.pvalue, update.pvalue),
                                                                           LT(update.time, ur.time + Int(30)),
                                                                           update > ur)))

no_random_update = forall(Update, lambda update: exist(Request_Update, lambda ur:
                                                                       AND(EQ(ur.pid, update.pid),
                                                                           EQ(ur.subject, update.subject),
                                                                           EQ(ur.pvalue, update.pvalue),
                                                                           ur < update)))

no_two_collect_with_time = NOT(exist([Collect, Collect], lambda c1, c2: AND(NEQ(c1.pid, c2.pid), EQ(c1.subject, c2.subject),
                                                                            c1 > c2,
                                                                            LT(Minus(c1.time, c2.time), Int(5)))))


erase_own_data = forall(Erase,lambda erase : exist(Collect, lambda collect: AND(collect < erase, EQ(collect.pid, erase.pid),
                                                                                 EQ(collect.subject, erase.subject))))

balance_of_same_subject = lambda b1, b2: EQ(b1.subject, b2.subject)
erase_with_balence = forall(Erase, lambda erase : exist(Balance, lambda b1:
                                                       AND(EQ(b1.subject, erase.subject), GE(b1.balance, Plus(Int(5), b1.time)),
                                                           EQ(b1.time, erase.time),
                                                           next(Balance, balance_of_same_subject, lambda b2:
                                                                AND(EQ(b1.subject, b2.subject),
                                                                    EQ(b2.balance, Minus(b1.balance, Plus(Int(5), b1.time)))), b1.time))))

no_conflicting_balance = forall([Balance, Balance], lambda b1, b2: Implication(EQ(b1.subject, b2.subject), Or(NEQ(b1.time, b2.time), b1.build_eq_constraint(b2))))

valid_balance = forall(Balance, lambda b1: OR(And(EQ(b1.time, Int(0)), EQ(b1.balance, Int(0))),
                                              previous(Balance, balance_of_same_subject, lambda b2: AND(EQ(b1.subject, b2.subject),
                                                                                                        OR(EQ(b1.balance, Int(0)),
                                                                                                           exist(Collect, lambda collect:
                                                                                                           AND(
                                                                                                                 EQ(collect.subject, b2.subject),
                                                                                                                 EQ(collect.time, b2.time),
                                                                                                                 EQ(Plus(b2.balance, Int(4)), b1.balance )
                                                                                                           )
                                                                                                                 ),

                                                                                                           exist(Erase, lambda erase:
                                                                                                           AND(
                                                                                                                 EQ(erase.subject, b2.subject),
                                                                                                                 EQ(erase.time, b2.time),
                                                                                                                 EQ(Minus(b2.balance, Plus(Int(5), b2.time)), b1.balance )
                                                                                                           )
                                                                                                                 ),

                                                                                                        exist(Update, lambda update:
                                                                                                           AND(
                                                                                                                 EQ(update.subject, b2.subject),
                                                                                                                 EQ(update.time, b2.time),
                                                                                                                 EQ(Plus(b2.balance, Int(3)), b1.balance )
                                                                                                           )
                                                                                                                 ),



                                                                                                           )), b1.time)))



One_data_per_person = forall(Collect, lambda c1: forall(Collect, lambda c2:
                                                        Implication(NEQ(c1.pid, c2.pid),
                                                                    NEQ(c1.subject, c2.subject))))


access_consented = forall(Access, lambda access: once(Authorize, lambda au:
AND(EQ(access.pid, au.pid), EQ(access.a1, au.a1), EQ(au.permission, Int(1))),access.time))


access_right_purpose = forall(Access, lambda access: once(Collect, lambda collect: AND(EQ(access.pid, collect.pid),
                                                                                       once(Assign_Expertise,
                                                                                            lambda ae: AND(EQ(ae.a1, access.a1),
                                                                                                           exist(Has_Expertise, lambda he:
                                                                                                                 AND(EQ(he.time, Int(0)),
                                                                                                                     EQ(he.purpose, collect.purpose),
                                                                                                                     EQ(ae.expertise, he.expertise)
                                                                                                                     )
                                                                                                                 )) ,access.time)), access.time))
                  
complete_rules = [access_consented, access_right_purpose,  no_two_collect_with_time, increasing_pid, One_data_per_person, incrementing_pid, root_pid, update_after_collection, access_up_to_date,
             request_to_update_fullfilled, no_random_update, access_after_collection, no_double_collect, erase_own_data, erase_with_balence,
                  no_conflicting_balance, valid_balance, access_not_deleted]`
export const thirdEditorPHIM = `# access after data deleted
rule = eventually(Access,  lambda access : once(Collect, lambda collect:
	                                         AND (EQ(collect.pid, access.pid),
	                                              exist(Erase, lambda erase:
														AND (erase < access,
														erase >= collect,
														EQ(erase.pid, collect.pid))
														)),
											access.time))`
export const firstEditorBacking = `from type_constructor import create_type, create_action, create_pair_action

type_dict = dict()
eid = create_type("uid", type_dict, lower_bound=0)
tid = create_type("tid", type_dict, lower_bound=0)
amount = create_type("amount", type_dict, lower_bound=0)
t = create_type("time", type_dict, lower_bound=0)

Trans = create_action("Transfer", [("sender", "uid"), ("receiver", "uid"),("id", "tid"),("amount", "amount"), ("time", "time")],type_dict)
Depo = create_action("Deposite", [("user", "uid"), ("amount", "amount"),("id", "tid"),("time", "time")],type_dict)
Withdraw = create_action("Withdraw", [("user", "uid"), ("amount", "amount"),("id", "tid"),("time", "time")],type_dict)
TimeStamp = create_action("TimeStamp", [("time", "time")],type_dict)


ACTION = [TimeStamp, Trans, Depo, Withdraw]
state_action = [TimeStamp]`

export const secondEditorBacking = `Balance_delay = 12

# rules go here

def _deposit_sum(user, time, action):
    deposit_sum = Sum(Depo, lambda deposit: deposit.amount, lambda deposit: AND(EQ(deposit.user, user),
                                                                                deposit.time < time),
                      trigger_act=action, input_subs={"user":user})
    return deposit_sum


#deposit_sum = make_bin_predicate(_deposit_sum)
deposit_sum = _deposit_sum

def _withdraw_sum(user, time, action):
    withdraw_sum = Sum(Withdraw, lambda withdraw: withdraw.amount, lambda withdraw: AND(EQ(withdraw.user, user),
                                                                                        withdraw.time < time),
                       trigger_act=action, input_subs={"user":user})

    return withdraw_sum


#withdraw_sum = make_bin_predicate(_withdraw_sum)
withdraw_sum = _withdraw_sum


def _transfer_in_sum(user, time, action):
    transfer_in_sum = Sum(Trans, lambda trans: trans.amount,
                          lambda trans: AND(trans.time < time,
                                            EQ(trans.receiver, user)), trigger_act=action, input_subs={"receiver":user})
    return transfer_in_sum


#transfer_in_sum = make_bin_predicate(_transfer_in_sum)
transfer_in_sum = _transfer_in_sum


def _transfer_out_sum(user, time, action):
    trans_out_sum = Sum(Trans, lambda trans: trans.amount,
                        lambda trans: AND(trans.time < time,
                                          EQ(trans.sender, user)), trigger_act=action, input_subs={"sender":user})
    return trans_out_sum

#transfer_out_sum = make_bin_predicate(_transfer_out_sum)
transfer_out_sum = _transfer_out_sum


def _balance(user, time, action, delay=Balance_delay):
    d_sum = deposit_sum(user,time - delay,action)
    t_in_sum = transfer_in_sum(user,time - delay,action)
    t_out_sum = transfer_out_sum(user,time,action)
    return d_sum + t_in_sum - t_out_sum


balance = make_bin_predicate(_balance)


def _daily_transfer_out_sum(user, time, action):
    trans_out_sum = Sum(Trans, lambda trans: trans.amount,
                        lambda trans: AND(trans.time >= time - Int(24),
                                          trans.time < time,
                                          EQ(trans.sender, user)), trigger_act=action, input_subs={"sender":user})
    return trans_out_sum

daily_transfer_out_sum = make_bin_predicate(_daily_transfer_out_sum)




# balance = _balance
complete_rules = []
complete_rules = add_background_theories(ACTION, state_action, complete_rules)
TS = union(Trans, Depo, Withdraw)

# every transication has a unqie tid
complete_rules.append(NOT(exist([Trans, Trans], lambda ts1, ts2: AND(NEQ(ts1, ts2), EQ(ts1.id, ts2.id)))))
complete_rules.append(NOT(exist([Withdraw, Withdraw], lambda ts1, ts2: AND(NEQ(ts1, ts2), EQ(ts1.id, ts2.id)))))
complete_rules.append(NOT(exist([Depo, Depo], lambda ts1, ts2: AND(NEQ(ts1, ts2), EQ(ts1.id, ts2.id)))))

# every deposite can have at most 500 dollars
complete_rules.append(forall(Depo, lambda depo: depo.amount <= 500))
# every user can deposite at most once every day
complete_rules.append(forall([Depo, Depo], lambda depo1, depo2: Implication(AND(depo1.id > depo2.id,
                                                                                EQ(depo1.user, depo2.user)),
                                                                            depo1.time > depo2.time + Int(24))))

# if a user withdraw, then it must have sufficent balance
complete_rules.append(forall(Withdraw, lambda wd: balance(wd.user, wd.time, wd) >= wd.amount))

# if a user transfer out, then it must have sufficent balance
complete_rules.append(forall(Trans, lambda tr: balance(tr.sender, tr.time, tr) >= tr.amount))
complete_rules.append(forall(Trans, lambda tr: NEQ(tr.sender, tr.receiver)))

# a user can receive at most 2 transfer a day
complete_rules.append(NOT(exist([Trans, Trans, Trans], lambda trans1, trans2, trans3:
AND([trans1.id > trans2.id,
     trans2.id > trans3.id,
     EQ(trans1.receiver, trans2.receiver),
     EQ(trans2.receiver, trans3.receiver),
     trans1.time < trans3.time + Int(24),
     trans2.time < trans3.time + Int(24), ]
    )
                                )))

# a user can send at most 1 transfer at every hour
complete_rules.append(NOT(exist([Trans, Trans], lambda trans1, trans2:
AND([trans1.id > trans2.id,
     EQ(trans1.sender, trans2.sender),
     trans1.time <= trans2.time])
                                )))

# if a user transfer out an amount that is greater than 3000, then there is at least one day
# in the last week the user has transfer out more than 3000
transfer_protection = forall(Trans, lambda trans: Implication(trans.amount > 1500,
                                                              once(Trans, lambda trans1: AND(EQ(trans.sender, trans1.sender),
                                                                  _daily_transfer_out_sum(trans1.sender, trans1.time, trans1) > 1500,
                                                                                             trans1.time < trans.time -24,
                                                                                             trans1.time >= trans.time - Int(144)) ,
                                                                   trans.time
                                                              )))`

export const thirdEditorBacking = `rule = AND(transfer_protection, exist(Trans, lambda wd: wd.amount >= 1500))`